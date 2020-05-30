const MusicModel = require('../../models/music');

//목록조회
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10);

    if (Number.isNaN(limit)) return res.status(400).end();

    MusicModel.find((err, res) => {
        if (err) throw err;
        res.json(result);
    }).limit(limit);
};

//상세조회
const detail = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = music.filter(m => m.id === id);
    if (!result) return res.status(404).end();

    res.json(result);
}

//등록
const create = (req, res) => {
    const { singer, title } = req.body;
    if (!singer || !title) return res.status(400).end();

    // Document.save()
    const music = MusicModel({ singer, title });
    music.save((err, result) => {
        if (err) throw err;
        res.status(201).json(result);
    });
}

//수정
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = music.find(m => m.id === id);
    if (!result) return res.status(404).end();

    const { singer, title } = req.body;
    if (singer) result.singer = singer;
    if (title) result.title = title;
    res.json(result);
}

//삭제
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = music.find(m => m.id === id);
    if (!result) res.status(404).end();

    music = music.filter((m) => m.id !== id);
    res.json(music);
}

module.exports = { list, detail, create, update, remove };