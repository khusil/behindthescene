const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
  });

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
  
    if (!tag) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
  
    res.status(200).json(tag);
  } catch (err) {
      res.status(500).json(err);
    };
  });

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
  });
  

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!updateTag[0]) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json({message: 'Tag ' + req.params.id + ' updated!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    if (!deleteTag) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
  
    res.status(200).json({message: req.params.id + ' has been deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
  });

module.exports = router;