// define a user class which have usderid,username, usertype,email
// and a function to get user by id
class User {
    constructor(userId, username, userType, usertitle) {
        this.useremail = userId;
        this.username = username;
        this.userType = userType;
        this.title = usertitle
    }
    // function to get user by id
    static getUserById(userId) {
        // default user
        return new User('John Doe', 'student', 'djohn@smu.edu','Master of Science in Computer Science');    
    }
}


