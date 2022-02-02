import React from 'react';

const Dashboard: React.FC = ({children}: any) => {
	return (
		<div className='main-con'>
			<div className='header-con'>
				<span>T O D O &nbsp;&nbsp; A P P</span>
			</div>
			<div className='content-main'>
				{children}
			</div>
			<div className='footer-con'>
				<span className='footer-con--info'>Powered by ReactJS</span>
			</div>
		</div>
	);
};

export default Dashboard;
