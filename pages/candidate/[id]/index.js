import React, { useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'
import styles from '../../../styles/Candidate.module.css'
import Referaction from '../../../components/Referaction';

const index = ({userdetails}) => {
    const {query} = useRouter()
    const [job,setJob] = useState([])
    const [visibleForm,setVisibleForm] = useState(false)
    const getPosting = async(postingid)=>{
        try {
            await axios.get(`http://localhost:4000/postings/${postingid}`)
            .then((response)=>setJob([response.data]))
        } catch (error) {
            console.log(error)
        }
    }




    getPosting(query.posting)

    return (
        <div>
            {job.length === 0 ? <div>Just a moment</div> :     
            <div className={styles.container}>
                <div>
                    <p style={{fontSize:"2rem",fontWeight:"600"}}>{job[0].post_name}</p>
                    <p style={{fontSize:"1.25rem",color:"gray"}}>{job[0].organization}, <span>{job[0].location}</span></p>
                </div>
                <div className={styles.div_hori} style={{columnGap:"5px"}}>
                    <p style={{fontWeight:"600"}}>Skills Required:</p>
                    {job[0].skills.map((skill)=>{
                        return(<p>{skill}, </p>)
                    })}
                </div>
                <div className={styles.div_hori}>
                    <div><p><strong>Experience Level: </strong>{job[0].job_description.experience_level}</p></div>
                    <div><p><strong>Experience Required: </strong>{job[0].job_description.experience_reqd}</p></div>
                    <div><p><strong>Education Level: </strong>{job[0].job_description.education_level}</p></div>
                    <div><p><strong>Job Function: </strong>{job[0].job_description.job_function}</p></div>
                    <div><p><strong>Industry: </strong>{job[0].job_description.industry}</p></div>
                </div>
                <div>
                <p style={{fontSize: "1.2em",fontWeight:"600",marginBottom:"10px"}}>{'Description'}</p>
                    {job[0].job_description.description.map((item,index)=>{
                        return <p>{item}</p>
                    })}
                </div>
                <div>
                    <p style={{fontSize: "1.2em",fontWeight:"600"}}>{'Resposiblities'}</p>
                    <ul className={styles.list}>
                        {job[0].job_description.responsiblities.map((item,index)=>{
                            return <li>{item}</li>
                        })}
                    </ul>
                </div>
                <div>
                    <p style={{fontSize: "1.2em",fontWeight:"600"}}>{'Job Insights'}</p>
                    <ul className={styles.list}>
                        {job[0].job_insights.map((item,index)=>{
                            return <li>{item}</li>
                        })}
                    </ul>
                </div>
                <div className={styles.btn}>
                    <button onClick={()=>setVisibleForm(true)}>Apply Now</button>
                    <p style={{fontStyle:"italic",fontSize:"1.1rem"}}>Referred by {userdetails[0].fullName}</p>
                </div>
                <div className={styles.formContainer} style={visibleForm ? {display:"grid",pointerEvents:"all"} : {display:"none",pointerEvents:"none"}}>
                    <button onClick={()=>setVisibleForm(false)}>Close</button>
                    <Referaction postingId={job[0]._id} userId={userdetails[0]._id} postName={job[0].post_name} questions={job[0].screening_questions} postOrganization={job[0].organization} useremail={userdetails[0].emailAddress} username={userdetails[0].fullName} linkavailable={'false'}/>
                </div>
            </div>
            }
        </div>
    );
};

export const getServerSideProps = async(context)=>{
    const responseUsers = await fetch(`http://localhost:4000/userdetails/${context.params.id}`)
    const userdetails = await responseUsers.json()
    return{
        props:{
            userdetails
        }
    }
}


export default index;