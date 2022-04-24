#!/bin/bash

flask recreate-db
python3 -m flask run --host=0.0.0.0