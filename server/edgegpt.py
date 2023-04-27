import re
from flask import Flask, request, jsonify
from EdgeGPT import Chatbot, ConversationStyle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
bot = Chatbot(cookie_path='./cookies.json')


@app.route('/', methods=['POST'])
async def chatbot():
    data = request.json
    if data is None:
        return jsonify({"error": "Invalid request data"}), 400
    detail = data.get('detail', False)
    points = data.get('points', False)
    url = data.get('url', '')
    print(url + "is the url")
    if url == '':
        return jsonify({
            "summary": "Please open it in a tab with url",
            "isLoading": "false"
        })
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
            # add "-" to beginning of each line
            text = re.sub(r'\[\^[^\]]+\^\]', '', text)
            text = text.replace(" -", "\n-")
            result.append(text)
    print("sending the result")
    return jsonify({
        "summary": result,
        "isLoading": "false"
        })


if __name__ == '__main__':
    app.run()
