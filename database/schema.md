# Expense Tracker MongoDB Schema

## Database

expense_tracker

## Collection

expenses

## Expense Document

{
  "_id": "ObjectId",
  "title": "string",
  "amount": "number",
  "category": "string",
  "description": "string",
  "date": "date",
  "createdAt": "date",
  "updatedAt": "date"
}

## Categories

- Food
- Transport
- Shopping
- Education
- Entertainment
- Other