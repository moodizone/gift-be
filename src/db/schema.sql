-- sudo su - postgres
-- pg_dump -s Gift-Store

-- TODO: in future, it can automate with script
-
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Ubuntu 16.4-1build1)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-1build1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: genderEnum; Type: TYPE; Schema: public; Owner: gift-db
--

CREATE TYPE public."genderEnum" AS ENUM (
    '1',
    '2',
    '3'
);


ALTER TYPE public."genderEnum" OWNER TO "gift-db";

--
-- Name: TYPE "genderEnum"; Type: COMMENT; Schema: public; Owner: gift-db
--

COMMENT ON TYPE public."genderEnum" IS '1 --> male
2 --> female
3 --> others';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: User; Type: TABLE; Schema: public; Owner: gift-db
--

CREATE TABLE public."User" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tel character varying(64) NOT NULL,
    name character varying(64),
    email character varying(64),
    gender public."genderEnum",
    password text DEFAULT 'temp_password'::text NOT NULL
);


ALTER TABLE public."User" OWNER TO "gift-db";

--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: gift-db
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: User email; Type: CONSTRAINT; Schema: public; Owner: gift-db
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT email UNIQUE (email);


--
-- Name: User tel; Type: CONSTRAINT; Schema: public; Owner: gift-db
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT tel UNIQUE (tel);


--
-- PostgreSQL database dump complete
--
