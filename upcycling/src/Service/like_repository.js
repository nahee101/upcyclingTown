import { getDatabase, ref, set, remove} from 'firebase/database'

class LikeRepository {

    constructor(app) {
        this.db = getDatabase();
    }

    saveLike(userId,review){
        set(ref(this.db, `${userId}/likes/${review.id}`), review);
        set(ref(this.db, `reviews/review/${review.id}/likes/${userId}`), userId);
    }

    removeLike(userId, review) {
        remove(ref(this.db, `${userId}/likes/${review.id}`));
        remove(ref(this.db, `reviews/review/${review.id}/likes/${userId}`));
    }
}

export default LikeRepository;