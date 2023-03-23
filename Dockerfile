FROM python:3.9.6

WORKDIR /code

ENV PYTHONPATH "${PYTHONPATH}:/code/crud/"

COPY ./backend/requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./backend/crud /code/crud

WORKDIR ./code/crud 

RUN pip install uvicorn

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8081"]

