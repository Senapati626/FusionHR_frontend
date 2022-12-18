import React,{useState} from 'react';
import dashboardStyles from '../styles/Dashboard.module.css'
import Referaction from './Referaction';
import axios from 'axios';

const Saved = ({postings,userid,userdetails}) => {
    const [linkStatus, setLinkStatus] = useState("none")
    let filteredPostings = postings.filter((posting)=>{
        return posting.saved_users.includes(userid)
    })
    const openReferTab = (e)=>{
        const tab = document.getElementById(e.currentTarget.value)
        tab.style.display = "grid"
    }
    const closeReferTab = (e)=>{
        const tab = document.getElementById(e.currentTarget.value)
        tab.style.display = "none"
    }

    const removeSave = (e)=>{
        try {
            axios.put('https://copper-chipmunk-gown.cyclic.app/removesave',{
                userid: userid,
                posting: e.currentTarget.value
            })
            .then((response)=>console.log(response))
            .then((alert(`Removed posting #${e.currentTarget.value} from saved postings`)))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={dashboardStyles.dashboard_container}>
        <div className={dashboardStyles.dashboard_header}>
            <p>Saved Job Postings will appear here</p>
        </div>
        {filteredPostings.map((posting,index)=>{
            return(
                <div className={dashboardStyles.card} key={index}>
                <div className={dashboardStyles.refer_container} id={posting._id}>
                    <Referaction postingId={posting._id} userId={userid} postName={posting.post_name} questions={posting.screening_questions} postOrganization={posting.organization} useremail={userdetails.emailAddress} username={userdetails.fullName}/>
                    <button onClick={closeReferTab} value={posting._id} className={dashboardStyles.refer_close_btn}>Cancel</button>
                </div>
                <div className={dashboardStyles.card_left}>
                    <button className={dashboardStyles.remove_btn} onClick={removeSave} value={posting._id}>
                        Remove
                    </button>
                    <div>
                        <div className={dashboardStyles.post_name}>
                            <p>{posting.post_name}</p>
                        </div>
                        <div className={dashboardStyles.post_detail}>
                            <p>{posting.organization}</p>
                            <p>{posting.location}</p>
                        </div>
                        <div className={dashboardStyles.post_skills}>
                            {posting.skills.map((skill,index)=>{
                                return <span key={index}>{skill}</span>
                            })}
                        </div>
                    </div>
                    <div className={dashboardStyles.post_status} style={posting.status==="open" ? {display: "none"} : {display: "block"}}>
                        <p>{posting.status}</p>
                    </div>
                    <div className={dashboardStyles.post_links}>
                        <button onClick={()=>setLinkStatus(`description${posting._id}`)}>Job Description</button>
                        <button onClick={()=>setLinkStatus(`insights${posting._id}`)}>Job Insights</button>
                        <button onClick={()=>setLinkStatus(`screening${posting._id}`)} style={posting.screening_questions.length===0 ? {display:"none"} : {display:"block"}}>Screening Questions</button>
                    </div>
                    {linkStatus===`description${posting._id}` ?
                    <div className={dashboardStyles.post_expand} style={linkStatus===`description${posting._id}` ? {transform:"scaleY(1)",pointerEvents:"all"} : {transform: "scaleY(0)",pointerEvents:"none"}}>
                        <div className={dashboardStyles.post_description_top}>
                            <p><strong>Experience Level: </strong>{posting.job_description.experience_level}</p>
                            <p><strong>Experience Required: </strong>{posting.job_description.experience_reqd}</p>
                            <p><strong>Education Level: </strong>{posting.job_description.education_level}</p>
                            <p><strong>Job Function: </strong>{posting.job_description.job_function}</p>
                            <p><strong>Industry: </strong>{posting.job_description.industry}</p>
                        </div> 
                        <div className={dashboardStyles.post_description_bottom}>
                            <div>
                            {posting.job_description.description.map((item)=>{
                                return <p>{item}</p>
                            })}
                            </div>
                            <div>
                            <p><strong>Responsiblities:</strong></p>
                            <ul className={dashboardStyles.post_responsiblities}>
                                {posting.job_description.responsiblities.map((item)=>{
                                    return <li>{item}</li>
                                })}
                            </ul>
                            </div>
                        </div>
                        <div className={dashboardStyles.post_expand_close}>
                            <button onClick={()=>setLinkStatus("none")}>Close</button>
                        </div> 
                    </div>
                    : linkStatus === `screening${posting._id}` ?
                    <div className={dashboardStyles.post_expand} style={linkStatus===`screening${posting._id}` ? {transform:"scaleY(1)",pointerEvents:"all"} : {transform: "scaleY(0)",pointerEvents:"none"}}>
                        <ul style={{paddingLeft:"1.75em"}}>
                            {posting.screening_questions.map((question)=>{
                                return <li>{question}</li>
                            })}
                        </ul>
                        <div className={dashboardStyles.post_expand_close}>
                            <button onClick={()=>setLinkStatus("none")}>Close</button>
                        </div> 
                    </div>
                    : linkStatus === `insights${posting._id}` ?
                    <div className={dashboardStyles.post_expand} style={linkStatus===`insights${posting._id}` ? {transform:"scaleY(1)",pointerEvents:"all"} : {transform: "scaleY(0)",pointerEvents:"none"}}>
                        <ul style={{paddingLeft:"1.75em"}}>
                            {posting.job_insights.map((insight)=>{
                                return <li>{insight}</li>
                            })}
                        </ul>
                        <div className={dashboardStyles.post_expand_close}>
                            <button onClick={()=>setLinkStatus("none")}>Close</button>
                        </div> 
                    </div>  
                    :
                    <div className={dashboardStyles.post_expand}></div>
                    }
                </div>
                <div className={dashboardStyles.card_right}>
                    <div className={dashboardStyles.post_employment} style={posting.employment==="Contract" ? {backgroundColor:"#1b7c2e"} : {backgroundColor:"#E5625E"}}>
                        <p>{posting.employment}</p>
                    </div>
                    <div className={dashboardStyles.post_reward}>
                        <p style={{fontSize:"0.875em",fontWeight:"300"}}>Referral Reward</p>
                        <p style={{fontSize:"1.5em",fontWeight:"500"}}>${posting.referral_reward}</p>
                        <p style={{fontSize:"0.875em",fontWeight:"300",marginBlock:"0.5rem"}}>Guarantee Period: {posting.guarantee_period} days</p>
                        <button className={dashboardStyles.refer_btn} onClick={openReferTab} value={posting._id} style={posting.status==="open" ? {display: "block"} : {display: "none"}}>Refer</button>
                    </div>
                </div>
            </div>
            )
        })}
        </div>
    );
};

export default Saved;