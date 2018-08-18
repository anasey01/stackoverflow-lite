class Authentication{
    constructor(){
        this.userCollection = {};
    }

    registerUser(fullname, username, gender, email, password){
        let existing = false;
        Object.keys(this.userCollection).forEach(key => {
            if(this.userCollection[key] == username){
                existing = true;
            }
        });
        if(!existing) {
            return this.createUser(fullname,username,gender, email, password)
        } else {
            console.log("User email already exists")
            return false
        }
    }

    createUser(fullname, username, gender, email, password){
        let id = `id${(Object.keys(this.userCollection).length+1)}`
        let userData = {
            id       : id,
            fullname : fullname,
            username : username,
            gender   : gender,
            email    : email,
            password : password
        }
        this.userCollection[id] = userData;
        return userData;
    }

    loginUser(username, password){
        let user = false;
        Object.keys(this.userCollection).forEach(key =>{
            if(this.userCollection[key].username == username) {
                if(this.userCollection[key].isLoggedIn) {
                    user = this.userCollection[key];
                    console.log("You are already logged in");
                    return;
                }
                else {
                    if(this.userCollection[key].password === password){
                        this.userCollection[key].isLoggedIn = true;
                        user = this.userCollection[key];
                        return;
                    }
                }
            }
        });

        if(!user) {
            console.log("Username or password incorrect")
            return
        } else {
            console.log(`Welcome ${user.name}`)
            return user
        }
    }

    logout(user) {
        Object.keys(this.userCollection).forEach(key =>{
            if(this.userCollection[key].username == user.username) {
                this.userCollection[key].isLoggedIn = false
                console.log("you've been logged out")
                return
            }
        });
    }

    getAllUsers(){
        return this.userCollection;
    }


}