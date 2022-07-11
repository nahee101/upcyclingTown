import { getDatabase, ref, set, remove} from 'firebase/database'

class CommentRepository {

    constructor(app) {
        this.db = getDatabase();
    }

    saveComment(userId,reviewId, comment){
        set(ref(this.db, `${userId}/comments/${comment.id}`), comment);
        set(ref(this.db, `reviews/review/${reviewId}/comment/${comment.id}`), comment);
    }

    removeComment(userId, reviewId, comment) {
        remove(ref(this.db, `${userId}/comments/${comment.id}`));
        remove(ref(this.db, `reviews/review/${reviewId}/comment/${comment.id}`));
    }
}

export default CommentRepository;