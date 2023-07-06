export default class UsersDTO {
    static usersToDTO = (user) =>{
        const users = []
        user.forEach(u => {
            const user = {
                name: `${u.first_name} ${u.last_name}`,
                email: u.email,
                role: u.role
            }
            users.push(user)
        });
        return dto
    }
}