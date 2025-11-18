# BlogReader

========

BlogReader provides a front-end application to read and display the blogs written [here](https://github.com/JKanaiya/BlogWriter). 
The [API](https://github.com/JKanaiya/BlogAPI) to facilitate this interaction.

## Usage

### Setup

1. Clone the repo
```bash
git clone https://github.com/JKanaiya/BlogAPIReader.git
cd BlogAPIReader
```
2. Install dependencies
`npm install`
3. Create and configure .env
```bash
echo "VITE_BACKEND_URL=<your_backend_url_here>" >> .env
```
4. Run the development server
`npm run dev`

--


Features
--------

- Displays blogs in markdown format
- Persistent Login/Signup
- Comments    
    - Nested Comments
    - Editing Comments
    - Deleting Comment Text

License
-------

The project is licensed under the BSD license.

