import Favorite from '../model/favorites.js'


export const getFavorites = async (req, res, next) => {
  const { userId } = req.query;

  try {
    const favorites = await Favorite.find({ user: userId });
    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ message: "No favorites found for the user" });
    }
    return res.status(200).json({ favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const addToFavorites = async (req, res, next) => {
  const { userId, recipeId } = req.body;

  try {
    const favorite = new Favorite({
      user: userId,
      recipe: recipeId,
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: 'Error adding to favorites' });
  }
};

export const removeFromFavorites = async (req, res, next) => {
  const { userId, recipeId } = req.body;

  try {
    await Favorite.findOneAndDelete({ user: userId, recipe: recipeId });
    res.status(200).json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing from favorites' });
  }
};

export const checkFavorites = async (req, res, next) => {
  const { userId, recipeId } = req.query;
  try {
    const favorite = await Favorite.findOne({ user: userId, recipe: recipeId });
    if (favorite) {
      res.status(200).json({ message: 'Found in favorites' });
    }else{
      res.status(404).json({message:"Not Found"})
    }
  } catch (error) {
    console.error('Error checking favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}