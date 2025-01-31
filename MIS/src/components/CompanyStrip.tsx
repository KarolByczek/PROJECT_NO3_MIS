import React from 'react';
import { Link } from 'react-router-dom';

const CompanyStrip = () => {
    return (
        <div className='company_strip'>
            <div className='company_substrip company_substrip_left'>
                <a href="">Service</a>
                <a href="">Contact</a>
                <a href="">About Us</a>
            </div>
            <Link className='company_icon' to='/'>
                <img className='company_icon_image' src="src/assets/company-icon.jpg" alt="company icon/return to homepage" />
            </Link>
            <div className='company_substrip company_substrip_right'>
                <a href="">Maintenance</a>
                <a href="">30 Day Money-Back Guarantee</a>
            </div>
        </div>
    )
}

export default CompanyStrip
