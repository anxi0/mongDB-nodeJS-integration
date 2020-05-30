//data
let nextID = 4;
let movie = [
    { id: 1, title: "아이언맨", director: "존 패브로", year: "?"},
    { id: 2, title: "옥자", director: "봉준호", year: "2017"},
    { id: 3, title: "올드보이", director: "박찬욱", year: "2003"}
]

//목록조회
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10);

    if (Number.isNaN(limit)) return res.status(400).end();

    res.json(movie.slice(0, limit));e
}

//상세조회
const detail = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.filter(m => m.id === id);
    if (!result) return res.status(404).end();

    res.json(result);
}

//등록
const create = (req, res) => {
    const { title, director, year } = req.body;
    if (!director || !title || !year) return res.status(400).end();

    const m = { id: nextID++, title, director, year };
    movie.push(m);
    res.status(201).json(m);
}

//수정
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.find(m => m.id === id);
    if (!result) return res.status(404).end();

    const { title, director, year } = req.body;
    if (title) result.title = title;
    if (director) result.director = director;
    if (year) result.year = year;
    res.json(result);
}

//삭제
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.find(m => m.id === id);
    if (!result) res.status(404).end();

    movie = movie.filter((m) => m.id !== id);
    res.json(movie);
}

module.exports = { list, detail, create, update, remove };