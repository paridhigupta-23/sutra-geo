CREATE EXTENSION IF NOT EXISTS postgis;
CREATE TABLE IF NOT EXISTS heritage_nodes (id text PRIMARY KEY,name text NOT NULL,city text NOT NULL,state text NOT NULL,category text NOT NULL,geom geometry(Point,4326) NOT NULL,radius_m integer NOT NULL DEFAULT 50,source_url text);
CREATE INDEX IF NOT EXISTS heritage_nodes_geom_idx ON heritage_nodes USING GIST(geom);
CREATE TABLE IF NOT EXISTS journey_events (id uuid PRIMARY KEY,user_id text NOT NULL,node_id text REFERENCES heritage_nodes(id),event_type text NOT NULL,created_at timestamptz NOT NULL DEFAULT now());
