import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/expenses";

function App() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "Food",
        description: ""
    });

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(API_URL);
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const addExpense = async (event) => {
        event.preventDefault();

        try {
            await axios.post(API_URL, {
                ...form,
                amount: Number(form.amount)
            });

            setForm({
                title: "",
                amount: "",
                category: "Food",
                description: ""
            });

            fetchExpenses();
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchExpenses();
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const total = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    return (
        <div className="container">

            <h1>Expense Tracker</h1>

            <div className="total">
                Total Expenses: ₹{total}
            </div>

            <form onSubmit={addExpense} className="expense-form">

                <input
                    type="text"
                    name="title"
                    placeholder="Expense title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                />

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                >
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Shopping</option>
                    <option>Education</option>
                    <option>Entertainment</option>
                    <option>Other</option>
                </select>

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />

                <button type="submit">
                    Add Expense
                </button>

            </form>

            <h2>Expenses</h2>

            {loading ? (
                <p>Loading...</p>
            ) : expenses.length === 0 ? (
                <p>No expenses yet.</p>
            ) : (
                <div className="expense-list">

                    {expenses.map((expense) => (
                        <div
                            className="expense-card"
                            key={expense._id}
                        >
                            <div>
                                <h3>{expense.title}</h3>

                                <p>
                                    Category: {expense.category}
                                </p>

                                <p>
                                    {expense.description}
                                </p>
                            </div>

                            <div>
                                <strong>
                                    ₹{expense.amount}
                                </strong>

                                <button
                                    onClick={() =>
                                        deleteExpense(expense._id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default App;