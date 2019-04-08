from flask import Flask, render_template, send_file
import os

app = Flask(__name__)
app.static_url_path='/static'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data/data_source0.csv')
def download_file():
    return send_file(os.path.join(os.getcwd(), 'data/data_source0.csv'), attachment_filename='data_source0.csv')

if __name__ == "__main__":
    app.run()
