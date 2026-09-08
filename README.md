# Exercise Tracker

A full-stack workout tracker for logging and reviewing weight room workout.

**Live demo:** https://exercise-tracker.anuraag-karunakaran.workers.dev/

## What it does

Register, log in, and track workouts, record exercises, sets, and reps, and review your history over time.

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Deployed on Cloudflare Workers 

**Backend**
- Express + TypeScript
- Prisma ORM
- JWT auth with httpOnly cookies
- Deployed on Render

**Database**
- PostgreSQL, hosted on Neon

## Architecture

The frontend and backend run as two independent services and communicate over HTTPS:
