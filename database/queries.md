# MongoDB Expense Queries

## Insert expense

db.expenses.insertOne({
  title: "Pizza",
  amount: 250,
  category: "Food",
  description: "Dinner",
  date: new Date()
})

## Get all expenses

db.expenses.find()

## Get expenses by category

db.expenses.find({
  category: "Food"
})

## Get one expense

db.expenses.findOne({
  _id: ObjectId("EXPENSE_ID")
})

## Update expense

db.expenses.updateOne(
  { _id: ObjectId("EXPENSE_ID") },
  {
    $set: {
      amount: 300
    }
  }
)

## Delete expense

db.expenses.deleteOne({
  _id: ObjectId("EXPENSE_ID")
})