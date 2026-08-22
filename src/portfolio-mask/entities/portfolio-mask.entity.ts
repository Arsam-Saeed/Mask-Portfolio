import {Entity, PrimaryGeneratedColumn ,Column,CreateDateColumn} from 'typeorm';
@Entity({name:"Contact"})
export class PortfolioMask {
    @PrimaryGeneratedColumn()
    id!:number;
    @Column({nullable:true})
    senderEmail!:string;
    @Column({nullable:true})
    receiverEmail!:string;
    @Column({nullable:true})
    message!:string;
    @Column({ name:'sender_name',nullable:true})
    senderName!:string;
    @CreateDateColumn({ name :"date_time",type:'timestamp'})
    dateTime!:Date&TimeRanges;
    


}
