--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: task_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_status_enum AS ENUM (
    'TODO',
    'IN_PROGRESS',
    'DONE'
);


ALTER TYPE public.task_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    task_id integer NOT NULL,
    title character varying NOT NULL,
    description text NOT NULL,
    status public.task_status_enum DEFAULT 'TODO'::public.task_status_enum NOT NULL,
    deadline date NOT NULL,
    user_id integer,
    created_by integer
);


ALTER TABLE public.task OWNER TO postgres;

--
-- Name: task_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task_task_id_seq OWNER TO postgres;

--
-- Name: task_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_task_id_seq OWNED BY public.task.task_id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    name character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_user_id_seq OWNER TO postgres;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- Name: task task_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN task_id SET DEFAULT nextval('public.task_task_id_seq'::regclass);


--
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (task_id, title, description, status, deadline, user_id, created_by) FROM stdin;
4	makan ayam	makan ayam enak	TODO	2025-10-27	1	2
5	makan ayam	makan ayam enak	TODO	2025-10-27	1	2
9	makan ayam	makan ayam asin	TODO	2025-10-27	1	4
1	makan nasi	makan nasi pake sambel	DONE	2025-10-17	2	1
10	Upgrade RC	Upgrade RC COC	IN_PROGRESS	2025-10-17	6	1
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (user_id, name, username, password) FROM stdin;
1	kevin	kvn	$2b$10$LNyTiCYzsT1wsakNi4gRyO49WNUlc/vYPKv7YdlhDnfZOeCE4chL2
2	kevin	kolong	$2b$10$pPr1DGPEBZG0s5l5e92.O.E6D9r65Z1JhIzneZB/wGqNWWtUWLqIS
3	kevin	cosmos	$2b$10$QYfHEJ5O/rwZoTnYSvhld.L9sy8AI4O6WnYR.8OloTSzJlgQCtMxy
4	Emerio Kevin Aryaputra	kevindut	$2b$10$bEg0iG4W0ConES55coDAce8xxgPYH3IMifDznS237sChmNj7cTCAq
5	kevin	kipas	$2b$10$9mzBXrGd.gaDoVuW/xwavOgnTHBLN.3dVNhjzwp930liZH2s.G3rq
6	Emerio Kevin Aryaputra	pinkepin23	$2b$10$cYs.xuadMZv0eAEERXqeF.ZtkDaYPkmw5H98ighDbKqA6vZAO.UTG
7	Manca	mily	$2b$10$MfTTtZkf8AiXBsvGlEaBveysHysjv2Z2OHzwx5rqKN3cxdOGmDYf2
\.


--
-- Name: task_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_task_id_seq', 11, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_user_id_seq', 7, true);


--
-- Name: task PK_721f914bb100703f201a77dd58f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_721f914bb100703f201a77dd58f" PRIMARY KEY (task_id);


--
-- Name: user PK_758b8ce7c18b9d347461b30228d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY (user_id);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: task FK_6ea2c1c13f01b7a383ebbeaebb0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0" FOREIGN KEY (user_id) REFERENCES public."user"(user_id);


--
-- Name: task FK_7126a406a07736826b7988ae207; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_7126a406a07736826b7988ae207" FOREIGN KEY (created_by) REFERENCES public."user"(user_id);


--
-- PostgreSQL database dump complete
--

