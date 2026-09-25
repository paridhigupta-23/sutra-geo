import os, math, httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
app=FastAPI(title='SUTRA-GEO API',version='0.2.0')
class AskRequest(BaseModel):
    query:str
    context:dict|None=None
    language:str='en'
class GeoRequest(BaseModel):
    lat:float; lng:float; node_lat:float; node_lng:float; radius:float=50
def distance_m(a,b,c,d):
    r=6371000;p=math.pi/180;x=(c-a)*p;y=(d-b)*p;h=math.sin(x/2)**2+math.cos(a*p)*math.cos(c*p)*math.sin(y/2)**2;return 2*r*math.asin(math.sqrt(h))
@app.get('/health')
def health():return {'ok':True,'service':'sutra-geo-api'}
@app.post('/v1/geofence/check')
def geofence(req:GeoRequest):
    d=distance_m(req.lat,req.lng,req.node_lat,req.node_lng);return {'distance_m':round(d,2),'radius_m':req.radius,'unlocked':d<=req.radius}
@app.post('/v1/ask-sutra')
async def ask(req:AskRequest):
    key=os.getenv('ANTHROPIC_API_KEY')
    if not key: raise HTTPException(503,'ANTHROPIC_API_KEY is not configured')
    context=req.context or {}
    prompt=f"Answer the traveller's question using only the supplied heritage context. If the context is insufficient, say so. Keep source links/attribution intact when supplied.\n\nCONTEXT:\n{context}\n\nQUESTION:\n{req.query}\nLANGUAGE:\n{req.language}"
    headers={'x-api-key':key,'anthropic-version':'2023-06-01','content-type':'application/json'}
    body={'model':os.getenv('ANTHROPIC_MODEL','claude-sonnet-4-6'),'max_tokens':500,'system':'You are SUTRA-GEO, a grounded heritage guide. Do not invent heritage facts.','messages':[{'role':'user','content':prompt}]}
    async with httpx.AsyncClient(timeout=25) as client:
        r=await client.post('https://api.anthropic.com/v1/messages',headers=headers,json=body)
    if r.status_code>=400: raise HTTPException(r.status_code,'LLM provider request failed')
    data=r.json();text=' '.join(x.get('text','') for x in data.get('content',[]) if x.get('type')=='text')
    return {'answer':text,'mode':'server-rag','sources':context.get('sources',[])}
