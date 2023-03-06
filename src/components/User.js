export class User {
    constructor() {
        this.name = "";
        this.isLoggedIn = false;
        this.votedUp = [];
        this.votedDown = [];
        this.favouriteComments = [];
        this.avatarUrl = "";
    }
    login(name) {
        this.name = name;
        this.isLoggedIn = true;
        this.createAvatar();
        this.loadUserFromStorage();
    }
    logout() {
        this.isLoggedIn = false;
        this.votedUp = [];
        this.votedDown = [];
        this.favouriteComments = [];
        this.avatarUrl = "";
    }
    createAvatar() {
        return new Promise((resolve, reject) => {
            const numImages = 10;
            const imageIndex = Math.floor(Math.random() * numImages);
            const imageUrl = `https://picsum.photos/id/${imageIndex}/200`;
            fetch(imageUrl)
                .then((response) => {
                if (response.ok) {
                    response.blob().then((blob) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = () => {
                            const imageUrl = reader.result;
                            this.avatarUrl = imageUrl;
                            this.saveUserToStorage();
                            resolve(this.avatarUrl);
                        };
                    });
                }
                else {
                    console.log("Error retrieving avatar image");
                    reject(new Error("Error retrieving avatar image"));
                }
            })
                .catch((error) => {
                console.log("Error retrieving avatar image", error);
                reject(new Error("Error retrieving avatar image"));
            });
        });
    }
    saveUserToStorage() {
        const userData = JSON.stringify({
            name: this.name,
            isLoggedIn: this.isLoggedIn,
            votedUp: this.votedUp,
            votedDown: this.votedDown,
            favouriteComments: this.favouriteComments,
            avatarUrl: this.avatarUrl,
        });
        localStorage.setItem("user", userData);
    }
    loadUserFromStorage() {
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            this.name = user.name;
            this.isLoggedIn = user.isLoggedIn;
            this.votedUp = user.votedUp;
            this.votedDown = user.votedDown;
            this.favouriteComments = user.favouriteComments;
            this.avatarUrl = user.avatarUrl;
        }
        else
            return false;
    }
    userLogged() {
        return this.isLoggedIn;
    }
    userHasName() {
        return this.name;
    }
    userHasAvatar() {
        return this.avatarUrl;
    }
}
