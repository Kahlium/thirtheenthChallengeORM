const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  Category.findAll({ 
    include: [ Product ],
  }).then((categories) => res.json(categories));


  // Only works with async

  // try {
  //   //Get all Categories
  //   const categoryData = await Category.findAll({ 
  //     include: [ Product ],
  //   });

  //   if (!categoryData) {
  //     res.status(404).json({ message: 'No categories found'});
  //     return;
  //   }
  //   res.status(200).json(categoryData);

  // } catch (err) {
  //   res.status(500).json(err);
  //   console.log(err)
  // }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [ Product ]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }

    res.status(200).json(categoryData);  
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }

    res.status(200).json(categoryData);  
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
