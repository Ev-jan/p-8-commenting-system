import { Services } from "../services/services.js";
import { DOMHelpsters } from "../services/DOMHelpsters.js";
import { CommentComponent } from "./Comment.js";
export class ReplyComponent extends CommentComponent {
    constructor(author, text, avatar, interlocutor, votes, favourite) {
        super(author, text, avatar, votes, favourite);
        this.id = Services.generateId();
        this.timeStamp = Services.getCurrentTimeStamp();
        this.votes = 0;
        this.interlocutor = interlocutor;
    }
    createReply(parentNode) {
        const commentNode = DOMHelpsters.createElement("li", [
            "reply",
            "thread-item_layout",
        ]);
        const content = `
        <div class="avatar">
          <img
            class="avatar-image"
            src="../public/assets/content-images/samsung-memory-hjRC0i0oJxg-unsplash 1avatar-pic.png"
            alt="Avatar"
          />
        </div>
        <div class="comment-info-container">
          <h4 class="username">${this.author}</h4>
          <div class="replied-user-info o-text-18-op-4">
            <img class="replied-user-info__icon" src="../public/assets/interface-images/icon-reply.svg" alt="Replied to">
            <div class="replied-user-info__text">${this.interlocutor}</div>
          </div>
          <time datetime="13:55 01-15" class="timestamp"
            >${this.timeStamp}</time
          >
        </div>
          <p class="comment-body">
          ${this.text}
          </p>
          <div class="action-bar">
            <button
              class="btn-favourite button-style-default o-text-18-op-4"
              id="btn-fav-${this.id}"
            >
              <img
                class="button-icon"
                src="../public/assets/interface-images/icon-saved.svg"
                alt="reply"
              />
              В избранное
            </button>
            <div class="comment-rating">
              <button
                class="btn-rating__icon_downvote button-style-default"
                id="downvote-${this.id}"
              >
                <img
                  src="../public/assets/interface-images/icon-downvote.svg"
                  alt="vote down"
                />
              </button>
              <div class="btn-rating__count o-text-18-op-4">${this.votes}</div>
              <button
                class="btn-rating__icon_upvote button-style-default"
                id="upvote-${this.id}"
              >
                <img
                  src="../public/assets/interface-images/icon-upvote.svg"
                  alt="vote up"
                />
              </button>
            </div>
          </div>
      `;
        parentNode.insertBefore(commentNode, parentNode.firstChild);
        DOMHelpsters.renderElement(commentNode, content);
    }
    updateReply() {
    }
    reply() { }
    /**
     * voteCount
     */
    voteCount() {
    }
    addToFavorite() {
    }
}
