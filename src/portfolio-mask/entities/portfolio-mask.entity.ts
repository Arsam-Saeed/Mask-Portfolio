import {Entity, PrimaryGeneratedColumn ,Column} from 'typeorm';
@Entity({name:"Contact"})
export class PortfolioMask {
    @PrimaryGeneratedColumn()
    id!:number;
    @Column({nullable:true})
    sender_email!:string;
    @Column({nullable:true})
    receiver_email!:string;
    @Column({nullable:true})
    message!:string;

}
