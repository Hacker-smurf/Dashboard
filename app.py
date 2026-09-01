from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/")
def dashboard():
    return render_template("dashboard.html")


@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({
            "success": False,
            "message": "No file selected."
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "success": False,
            "message": "No file selected."
        }), 400

    filepath = os.path.join(
        app.config["UPLOAD_FOLDER"],
        file.filename
    )

    file.save(filepath)

    return jsonify({
        "success": True,
        "message": f"{file.filename} uploaded successfully."
    })


@app.route("/scan", methods=["POST"])
def scan():
    # Placeholder for your scanning logic
    return jsonify({
        "success": True,
        "message": "Scan started successfully."
    })


@app.route("/report")
def report():
    # Placeholder for report generation
    return jsonify({
        "success": True,
        "report": {
            "status": "Completed",
            "files_scanned": 0,
            "findings": 0
        }
    })


if __name__ == "__main__":
    app.run(debug=True)
