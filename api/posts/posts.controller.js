import db from "../../models";

export const getTopPosts = async (req, res, next) => {
  let posts = null;
  try {
    posts = await db.Post.findAll();
  } catch (e) {
    console.error(e);
    next(e);
  }
  if (!posts)
    res.status(201).json({
      message:
        "아직 올라온 매물이 없네요, 혹시 안쓰시는 물건이 있다면 동양마켓에 등록 해보시는 것은 어떨까요?",
    });

  res.status(200).json(posts);
};

export const userPostList = async (req, res, next) => {
  const { id } = req.params;

  let posts = null;
  try {
    posts = await db.Post.findAll({
      where: {
        UserId: id,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }

  if (posts[0] == null)
    res.status(201).json({ message: "아직 등록한 게시글이 없습니다." });

  res.status(200).json(posts);
};
