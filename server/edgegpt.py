import re
from flask import Flask, request, jsonify
from EdgeGPT import Chatbot, ConversationStyle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
bot = Chatbot(cookiePath='./cookies.json')


@app.route('/', methods=['POST'])
async def chatbot():
    data = request.json
    if data is None:
        return jsonify({"error": "Invalid request data"}), 400
    detail = data.get('detail', False)
    points = data.get('points', False)
    url = data.get('url', '')
    prompt = url + " summarize the content on the webpage"
    if detail:
        prompt += " in detail"
    if points:
        prompt += " in points"
    response = await bot.ask(prompt=prompt, conversation_style=ConversationStyle.precise, wss_link="wss://sydney.bing.com/sydney/ChatHub")
    result = []
    for message in response['item']['messages']:
        if message['author'] == 'bot':
            text = message['text']
            text = re.sub(r'\[\^1\^\]', '', text)    # add "-" to beginning of each line
            result.append(text)
    return jsonify({"summary": result})


if __name__ == '__main__':
    app.run()
