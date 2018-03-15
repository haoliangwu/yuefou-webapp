#! /bin/bash

rsync -avzP --delete ./dist ubuntu@prisma.littlelyon.com:/home/ubuntu/lyon/yuefou-web/
