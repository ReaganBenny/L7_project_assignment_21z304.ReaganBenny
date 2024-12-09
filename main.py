from app import create_app
from app.utils import init_sample_data

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        init_sample_data()
    app.run(debug=True, port=5001)  # Change the port number here
    