import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash.get';
import checkNull from '../../utils/checkNull';
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
	cardContent:{
		paddingBottom: '0px',
	},
	chip: {
		marginLeft: 5,
		color: '#3d8af7',
		background: 'none',
		display: 'inline-block',
		fontSize: '16px',
	},
	chipLink: {
		'& :hover': {
			backgroundColor: '#fdf500',
			textDecoration: 'none',
		},
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	paragraph: {
		marginTop: '10px',
	},
});

class Progress extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			hasNext : false,
			progresses : [],
		};
	}

	componentDidMount() {
		const { topicId } = this.props;
		fetch(`${process.env.API}` + 'topics/' + encodeURI(topicId) + '/progress')
		.then(response => response.json())
		.then(data => {
			let progresses = data.content;
			this.setState({progresses : progresses});
			// console.log('progresses : ', data);
		})		
	}

	render() {
		const { classes } = this.props;
		const { progresses } = this.state;

		return (
			<div>
				{
					progresses.map(item => (
						<Card key={item.name} className={classes.card}>
							<CardContent className={classes.cardContent}>
								<Typography variant="h5" component="h2">
									{item.title}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{item.eventDate}
								</Typography>
								{item.tags.map(t => 
									<Link href={`/tag/${t}`} className={classes.chipLink}>
										<div className={classes.chip}>{'#' + t}</div>
									</Link>
								)}
							</CardContent>
							{
								item.references.map(ref => (
									<CardContent>
										{
											ref.imageUrl?
												<CardMedia
													className={classes.media}
													image={ref.imageUrl}
													title="Paella dish"
												/>:''	
										}										
										<Typography paragraph className={classes.paragraph}>
											{ref.comment}
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p">
											Source : <br/>
											<a href={ref.link} title={ref.title}>{ref.name} - {ref.title}</a>
										</Typography>
									</CardContent>
								))
							}							
						</Card>					
					))
				}
				{
					progresses.length <= 0?
					(
					<Card className={classes.card}>
						<CardHeader
							subheader='沒有資料'
						/>
					</Card>):''
				}
				
			</div>
			
		)
	}
	
}

Progress.propTypes = {
	classes: PropTypes.object.isRequired,
  };


export default withStyles(useStyles)(Progress);