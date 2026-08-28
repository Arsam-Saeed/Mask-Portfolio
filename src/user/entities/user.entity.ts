import { PrimaryGeneratedColumn,Entity, Column,} from 'typeorm';
@Entity({name:"Users"})
export class User {
    @PrimaryGeneratedColumn()
    id!:number;
    @Column({name:"user_email", nullable:true})
    userEmail!:string;
    @Column({name:"password_hash",nullable:true})
    passwordHash!:string;
    @Column({name:"verify_emial", nullable:true})
    verifyEmail!:string;
    @Column({name:"first_name",nullable:true})
    firstName!:string;
    @Column({name:"last_name",nullable:true})
    lastName!:string;

    @Column({name:'otp', nullable:true})
    otp!:string

}
