from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

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
        db.commit()
        db.close()

# Routes for products
@app.route('/api/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute('SELECT * FROM products;')
        products = cur.fetchall()
        return jsonify([dict(product) for product in products])
    except Exception as e:
        print(f"Error fetching products: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

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

if __name__ == '__main__':
    init_db()  # Initialize the database
    app.run(debug=True, port=5000)