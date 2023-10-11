import flask 

app = flask.Flask("app")

# GET HTML PAGE
def get_html(page_name):
  html_page = open(page_name)
  content = html_page.read()
  html_page.close()
  return content

# READ NOTES FROM THE NOTES FILE
def get_notes():
  notesDB = open("./notes.txt")
  content = notesDB.read()
  notesDB.close()
  notes = content.split('\n')
  return notes

# HANDLE ADD NEW NOTE
@app.route("/add")
def create_note():
  query = flask.request.args.get("addNote")
  file = open("notes.txt", "a")
  file.write(query + "\n")
  file.close()
  return notes_page()

# CREATE HOME ROUTE
@app.route("/")
def home_page():
  return get_html("./index.html")

# CREATE NOTES ROUTE
@app.route("/notes")
def notes_page():
   html_page = get_html("./notes.html")
   notes = get_notes()
   result = ""

   if len(notes) <= 1:
      result += "<h3 class='text-red'> No notes found, <a href='/' class='text-red'>start to add one!</a></h3>"

   for note in notes:
     if note != "":
       result += "<li class='noteElement'> " + note + "</li>"  
   return html_page.replace("$$NOTES$$", result)

# CREATE AND HANDLE SEARCH ROUTE
@app.route("/search")
def search_page():
  html_page = get_html("./notes.html")
  query = flask.request.args.get("searchNote")
  notes = get_notes()
  result = "" 

  for note in notes:
    if note.lower().find(query.lower()) != -1:
      result += "<li class='noteElement'> " + note + "<li>"
  
  if result == "":
    result += "<h3 class='text-red'> No notes found for this search </h3>"
  
  return html_page.replace("$$NOTES$$", result)
