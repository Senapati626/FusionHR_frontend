import React,{useEffect,useState} from 'react';
import dashboardStyles from '../styles/Dashboard.module.css'
import referralStyles from '../styles/Refer.module.css'
import axios from 'axios';
const Myreferrals = ({userdetails}) => {

    const [referrals,setReferrals] = useState([])
    const [unfilteredqueries,setUnfilteredueries] = useState([])

    useEffect(()=>{
        try {
            axios.get(`https://copper-chipmunk-gown.cyclic.app/referral/${userdetails._id}`)
            .then((response)=>setReferrals(response.data))
        } catch (error) {
            console.log(error)
        }
        try {
            axios.get('https://copper-chipmunk-gown.cyclic.app/admin/query')
            .then((response)=>setUnfilteredueries(response.data))
        } catch (error) {
            console.log(error)
        }
    },[])    

    const handleCommentSubmit = async(e)=>{
        e.preventDefault()
        try {
            await axios.post('https://copper-chipmunk-gown.cyclic.app/user/query',
                {
                    userId: userdetails._id,
                    userName: userdetails.fullName,
                    userEmail: userdetails.emailAddress,
                    userDoubt: e.target[0].value
                }
            )
            .then((response)=>console.log(response))
            .then((alert('Comment added successfully. Admin will soon respond')))
        } catch (error) {
            console.log(error)
        }
    }

    const queries = unfilteredqueries.filter((query)=>{
        return query.userId === userdetails._id
    })
    console.log(referrals)
    return (
        <div className={dashboardStyles.dashboard_container}>
            <div className={dashboardStyles.dashboard_header}>
                <p>Referred Candidates</p>
            </div>
            {referrals.length===0 ? 
            <div><p>Nothing to show here</p></div>
            :
            <div className={referralStyles.referral_container}>
            {referrals.map((referral)=>{
                return(
                    <div className={referralStyles.card}>
                        <div className={referralStyles.card_header}>
                            <p>{referral.given_name} {referral.surname}</p>
                        </div>
                        <div className={referralStyles.card_detail}>
                            <p>{referral.post_name}, {referral.post_organization}</p>
                            <p><strong>Referred on:</strong> {referral.referred_on.slice(0,10)}</p>
                            <p><strong>Referral ID:</strong> {referral._id}</p>
                        </div>
                        <div className={referralStyles.card_pipeline_container}>
                            <div className={referralStyles.card_pipeline_section}>
                                <div className={referralStyles.card_pipeline_graphic}>
                                    <div style={referral.pipeline.candidate_referred==="Successful" ? {background: "#e5625e"} : {background: "transparent"}}></div>
                                    <div></div>
                                </div>
                                <div className={referralStyles.card_pipeline_txt} style={referral.pipeline.candidate_referred === "Successful" ? {display:"none"} : {display:"flex"}}>
                                    <p>{'Candidate Referred'}</p>
                                    <p>{referral.pipeline.candidate_referred}</p>
                                </div>
                            </div>
                            <div className={referralStyles.card_pipeline_section}>
                                <div className={referralStyles.card_pipeline_graphic}>
                                    <div style={referral.pipeline.client_review==="Successful" ? {background: "#e5625e"} : {background: "transparent"}}></div>
                                    <div></div>
                                </div>
                                <div className={referralStyles.card_pipeline_txt} style={referral.pipeline.client_review === "Yet to Start" ? {display:"none"} : referral.pipeline.client_review === "Successful" ? {display:"none"} : {display:"flex"}}>
                                    <p>{'Under Client Review'}</p>
                                    <p>{referral.pipeline.client_review}</p>
                                </div>
                            </div>
                            <div className={referralStyles.card_pipeline_section}>
                                <div className={referralStyles.card_pipeline_graphic}>
                                    <div style={referral.pipeline.hr_review==="Successful" ? {background: "#e5625e"} : {background: "transparent"}}></div>
                                    <div></div>
                                </div>
                                <div className={referralStyles.card_pipeline_txt} style={referral.pipeline.hr_review === "Yet to Start" ? {display:"none"} : referral.pipeline.hr_review === "Successful" ? {display:"none"} : {display:"flex"}}>
                                    <p>{'Under HR Review'}</p>
                                    <p>{referral.pipeline.hr_review}</p>
                                </div>
                            </div>
                            <div className={referralStyles.card_pipeline_section}>
                                <div className={referralStyles.card_pipeline_graphic}>
                                    <div style={referral.pipeline.interview_stage==="Successful" ? {background: "#e5625e"} : {background: "transparent"}}></div>
                                    <div></div>
                                </div>
                                <div className={referralStyles.card_pipeline_txt} style={referral.pipeline.interview_stage === "Yet to Start" ? {display:"none"} : referral.pipeline.interview_stage === "Successful" ? {display:"none"} : {display:"flex"}}>
                                    <p>{'Interview Stage'}</p>
                                    <p>{referral.pipeline.interview_stage}</p>
                                </div>
                            </div>
                            <div className={referralStyles.card_pipeline_section}>
                                <div className={referralStyles.card_pipeline_graphic}>
                                    <div style={referral.pipeline.offer_stage==="Successful" ? {background: "#e5625e"} : {background: "transparent"}}></div>
                                    <div></div>
                                </div>
                                <div className={referralStyles.card_pipeline_txt} style={referral.pipeline.offer_stage === "Successful" ? {display:"none"} : referral.pipeline.offer_stage === "Yet to Start" ? {display:"none"} : {display:"flex"}}>
                                    <p>{'Offer Stage'}</p>
                                    <p>{referral.pipeline.offer_stage}</p>
                                </div>
                            </div>
                            <div className={referralStyles.card_pipeline_section}>
                                <div className={referralStyles.card_pipeline_graphic}>
                                    <div style={referral.pipeline.reward_stage==="Successful" ? {background: "#e5625e"} : {background: "transparent"}}></div>
                                    <div></div>
                                </div>
                                <div className={referralStyles.card_pipeline_txt} style={referral.pipeline.reward_stage === "Yet to Start" ? {display:"none"} : referral.pipeline.reward_stage === "Successful" ? {display:"none"} : {display:"flex"}}>
                                    <p>{'Reward Stage'}</p>
                                    <p>{referral.pipeline.reward_stage}</p>
                                </div>
                            </div>
                            <div className={referralStyles.card_pipeline_section}>
                                <div className={referralStyles.card_pipeline_graphic}>
                                    <div style={referral.pipeline.reward_recieved==="Successful" ? {background: "#e5625e"} : {background: "transparent"}}></div>
                                </div>
                                <div className={referralStyles.card_pipeline_txt} style={referral.pipeline.reward_recieved === "Yet to Start" ? {display:"none"} : {display:"flex"}}>
                                    <p>{'Reward Recieved'}</p>
                                    <p>{referral.pipeline.reward_recieved}</p>
                                </div>
                            </div>
                        </div>
                        <div className={referralStyles.card_pipeline_container_xs}>
                            <p><strong>Candidate Referred: </strong>{referral.pipeline.candidate_referred}</p>
                            <p><strong>Client Review: </strong>{referral.pipeline.client_review}</p>
                            <p><strong>HR Review: </strong>{referral.pipeline.hr_review}</p>
                            <p><strong>Interview Stage: </strong>{referral.pipeline.interview_stage}</p>
                            <p><strong>Offer Stage: </strong>{referral.pipeline.offer_stage}</p>
                            <p><strong>Reward Stage: </strong>{referral.pipeline.reward_stage}</p>
                        </div>
                    </div>
                )
            })}
            </div>
            }
            <div className={referralStyles.clarification_board}>
                <div className={referralStyles.clarification_form}>
                    <form onSubmit={handleCommentSubmit}>
                        <label>Have a question?</label>
                        <textarea placeholder="Let us clarify"></textarea>
                        <input type="submit" value="Comment"/>
                    </form>
                </div>
                <p className={referralStyles.clarification_wrapper_header} style={queries.length===0 ? {display:"none"} : {display:"block"}}>Previously answered queries</p>
                <div className={referralStyles.clarification_wrapper}>
                    {queries.map((query,index)=>{
                        return(
                            <div key={index} className={referralStyles.clarification_card} style={query.adminResponse==="N/A" ? {display:"none"} : {display:"flex"}}>
                                <div className={referralStyles.clarification_card_top}>
                                    <p>{query.userDoubt}</p>
                                    <p>{query.userName}   <span style={{color:"gray",fontSize:"0.75em"}}>{query.queriedOn.slice(0,10)}</span></p>
                                </div>
                                <div className={referralStyles.clarification_card_bottom}>
                                    <p>{'Admin'}</p>
                                    <p>{query.adminResponse}</p>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    );
};

export default Myreferrals;