import React from "react";

function ContactUs(){

    return (
        <div style={{display: 'grid',  justifyContent:'center', alignItems:'center'}}>
            <div style={{display: "flex", justifyContent:'center', alignItems:'center'}}>
                <h1 style={{color: '#f77d0a', fontSize: '150px', justifyItems:'center',fontWeight:'bold'}}>04</h1>
            </div>
            <div style={{}}>
                <h2 style={{color: '#2b2e4a', fontSize: '150px', fontWeight:'bold',display: 'flex',  justifyContent:'center', alignItems:'center'}}>CONTACT US</h2>
            </div>
            
            <div style={{display: 'flex'}}>
            <div style={{background: '#e2e3e8', display: 'grid', justifyContent:'center', alignItems:'center', height: '100%', width: '100%',marginRight:'40px'}}>
                <div style={{display:'flex' ,justifyContent:'space-between', margin:'50px'}}>
                <form>
                    <div>
                        <label>
                            <input style={{width:'47%', height: '50px', paddingLeft:'10px', borderColor: 'black', borderWidth: '1px', margin:'5px'}} type="text" name="name" placeholder="Your Name"/>
                        </label>
                        <label>
                            <input style={{width:'47%', height: '50px', paddingLeft:'10px', borderColor: 'black', borderWidth: '1px', margin:'5px'}} type="text" name="email" placeholder="Your Email"/>
                        </label>
                    </div>
                    
                    <div>
                        <label>
                            <input style={{width:'96.5%', height: '50px', paddingLeft:'10px', borderColor: 'black', borderWidth: '1px', margin:'5px'}} type="text" name="subject" placeholder="Subject"/>
                        </label>
                    </div>

                    <div>
                        <label>
                            <input style={{width:'96.5%', height: '150px', paddingLeft:'10px', borderColor: 'black', borderWidth: '1px', margin:'5px'}} type="text" name="message" placeholder="Message"/>
                        </label>
                    </div>
                    
                    <input style = {{width: '45%', height: '75px', fontWeight: 'bold', color: 'white' ,backgroundColor: '#fb923c', marginLeft: '1%', marginTop: '1%' }} type="submit" value="Submit" />
                </form>
                </div>
            </div>

            <div style={{background: '#2b2e4a', display: 'grid', justifyContent:'center', alignItems:'center', height: '100%', width: '100%',marginRight:'40px'}}>
                <div style={{display:'flex' ,justifyContent:'space-between', margin:'50px'}}>
                </div>
            </div>

            </div>
        </div>
    )

}
export default ContactUs;