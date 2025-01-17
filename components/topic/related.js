import checkNull from '../../utils/checkNull';

import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash.get';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import color from '@material-ui/core/colors/orange';
import Link from '../../src/link';

const useStyles = theme => ({
	card: {
		// maxWidth: 345,
		borderRadius: 0,
		marginBottom: '20px',
		backgroundColor: '#f9f9f9',
		'& a': {
			color: '#3d8af7',
		},
	},
	header: {
		paddingBottom: '0px',
	},
	container: {
		display: 'inline-flex',
		paddingTop: '0px',
	},
	row: {
		// borderBottom: '1px solid #767d92',
		textDecoration: 'none',
		'& :hover': {
			backgroundColor: '#cacaca',
			textDecoration: 'none',
		},
	},
	chip: {
		marginLeft: 5,
		color: 'rgba(0, 0, 0, 0.54)',
		background: 'none',
		display: 'inline',
		fontSize: '14px',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	avatar: {
		width: '100px',
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		flexShrink: 0,
		justifyContent: 'center',
		marginRight: '10px',
	},
	avatarImg: {
		width: '100%',
		height: '100%',
		objectFit: 'contain',
		textAlign: 'center',
	},
});

class Related extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			relatedTopics : [],
		};
		this.getData = this.getData.bind(this);
	}

	componentDidMount() {
		const {topics} = this.props;
		if (topics) {
			topics.forEach(element => {
				this.getData(element);
			});
		} 
	}

	getData(id) {
		fetch(`${process.env.API}` + 'topics/' + encodeURI(id))
		.then(response => response.json())
		.then(data => {
			this.setState({relatedTopics : [...this.state.relatedTopics, data]});
			// console.log('relatedTopics : ', data);
		})		
	}

	render() {
		const {relatedTopics} = this.state;
		const { classes } = this.props;

		return (
			<div>
				{
					relatedTopics.map(item => (
						<div key={item.topicId} className={classes.row}>
							<Link href={`/topic/${item.topicId}`}>
								{/* <a> */}
									<Card className={classes.card}>
										<CardHeader className={classes.header}
											subheader={item.eventDate}
										/>
										<CardContent className={classes.container}>
											{
												<div className={classes.avatar}>
												{
													item.references[0].imageUrl ?
													<img className={classes.avatarImg} src={item.references[0].imageUrl} />
													:
													<img className={classes.avatarImg} src="/static/images/default.png" />
												}
												</div>
											}		
											<div>							
												<Typography style={{marginTop:'16px'}}>
													{item.title}
												</Typography>
												<div >
													{
														get(item, 'tags', []).map(i =>
															<div key={i} className={classes.chip}>{'#' + i}</div>
														)
													}
												</div>	
											</div>	
										</CardContent>
													
									</Card>		
								{/* </a> */}
							</Link>			
						</div>
					))
				}
				{
					relatedTopics.length <= 0 ?
						(<Card className={classes.card}>
							<CardHeader
								subheader='沒有資料'
							/>
						</Card>):''
				}
			</div>
			
		)
	}
	
}

Related.propTypes = {
	classes: PropTypes.object.isRequired,
  };


export default withStyles(useStyles)(Related);