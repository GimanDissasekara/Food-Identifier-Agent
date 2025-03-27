from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from werkzeug.security import generate_password_hash, check_password_hash  # For password hashing

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# SQLite database file
DATABASE = 'food_recognition_app.db'

# Function to get a database connection
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Return rows as dictionaries
    return conn

# Initialize the database (create tables if they don't exist)
def init_db():
    with app.app_context():
        db = get_db_connection()
        # Create products table
        db.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price TEXT NOT NULL,
                description TEXT,
                image TEXT,
                category TEXT
            )
        ''')
        # Create users table
        db.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                address TEXT,
                phone TEXT NOT NULL,
                password TEXT NOT NULL
            )
        ''')
        db.commit()
        db.close()

# Routes for products (existing code)
@app.route('/api/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM products;')
    products = cur.fetchall()
    conn.close()
    return jsonify([dict(product) for product in products])

@app.route('/api/products', methods=['POST'])
def add_product():
    new_product = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            'INSERT INTO products (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);',
            (new_product['name'], new_product['price'], new_product['description'], new_product['image'], new_product['category'])
        )
        conn.commit()
        # Fetch the last inserted row to return it
        cur.execute('SELECT * FROM products WHERE id = last_insert_rowid();')
        product = cur.fetchone()
        return jsonify(dict(product)), 201
    except Exception as e:
        conn.rollback()
        print(f"Error adding product: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute('SELECT * FROM products WHERE id = ?;', (id,))
        product = cur.fetchone()
        if product:
            return jsonify(dict(product))
        else:
            return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        print(f"Error fetching product: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    updated_product = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            'UPDATE products SET name = ?, price = ?, description = ?, image = ?, category = ? WHERE id = ?;',
            (updated_product['name'], updated_product['price'], updated_product['description'], updated_product['image'], updated_product['category'], id)
        )
        conn.commit()
        cur.execute('SELECT * FROM products WHERE id = ?;', (id,))
        product = cur.fetchone()
        if product:
            return jsonify(dict(product))
        else:
            return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        conn.rollback()
        print(f"Error updating product: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute('DELETE FROM products WHERE id = ?;', (id,))
        conn.commit()
        if cur.rowcount > 0:
            return jsonify({"message": "Product deleted successfully"}), 200
        else:
            return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        conn.rollback()
        print(f"Error deleting product: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

# Route for user registration
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    address = data.get('address')
    phone = data.get('phone')
    password = data.get('password')

    # Validate required fields
    if not name or not email or not phone or not password:
        return jsonify({"error": "Missing required fields"}), 400

    # Hash the password before storing it
    hashed_password = generate_password_hash(password)

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        # Insert the new user into the database
        cur.execute(
            'INSERT INTO users (name, email, address, phone, password) VALUES (?, ?, ?, ?, ?);',
            (name, email, address, phone, hashed_password)
        )
        conn.commit()
        return jsonify({"message": "Registration successful"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already exists"}), 400
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

# Route for user login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Validate required fields
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        # Fetch the user from the database
        cur.execute('SELECT * FROM users WHERE email = ?;', (email,))
        user = cur.fetchone()

        if user and check_password_hash(user['password'], password):
            # Return a success message (you can also return a token for authentication)
            return jsonify({"message": "Login successful", "user": dict(user)}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    init_db()  # Initialize the database
    app.run(debug=True, port=5000)