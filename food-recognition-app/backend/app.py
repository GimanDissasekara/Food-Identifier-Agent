from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# PostgreSQL connection
def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='food_recognition_app',
        user='postgres',  # Replace with your PostgreSQL username
        password='1234'  # Replace with your PostgreSQL password
    )
    return conn

# Routes for products
@app.route('/api/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM products;')
    products = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(products)

@app.route('/api/products', methods=['POST'])
def add_product():
    new_product = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'INSERT INTO products (name, price, description, image, category) VALUES (%s, %s, %s, %s, %s) RETURNING *;',
        (new_product['name'], new_product['price'], new_product['description'], new_product['image'], new_product['category'])
    )
    product = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(product)

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    updated_product = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'UPDATE products SET name = %s, price = %s, description = %s, image = %s, category = %s WHERE id = %s RETURNING *;',
        (updated_product['name'], updated_product['price'], updated_product['description'], updated_product['image'], updated_product['category'], id)
    )
    product = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(product)

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM products WHERE id = %s;', (id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Product deleted'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)