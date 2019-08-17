import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash.get';
import checkNull from '../../utils/checkNull';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
	card: {
		// maxWidth: 345,
		borderRadius: 0,
		marginBottom: '20px',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
});

class Progress extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			progresses : [],
		};
	}

	componentDidMount() {
		if (this.state.progresses) {
			this.getData();
		}
	}

	getData() {
		fetch(`${process.env.API}` + 'topics/' + this.props.topicId + '/progress')
		.then(response => response.json())
		.then(data => {
			let progresses = data.content;

			this.setState({progresses : progresses});
			console.log('progress : ', progresses);
		})
	}

	render() {
		const {progresses} = this.state;
		const { classes } = this.props;

		return (
			<div>
				{
					progresses.map(item => (
						<Card className={classes.card}>
							<CardHeader
								title={item.title}
								subheader={item.eventDate}
							/>
							{
								item.references.map(ref => (
									<CardContent>
										<Typography paragraph>
											{ref.comment}
										</Typography>
										<Typography paragraph>
											<a href={ref.link} title={ref.title}>{ref.name} - {ref.title}</a>
										</Typography>
									</CardContent>
								))
							}							
						</Card>					
					))
				}
			</div>
			
		)
	}
	
}

Progress.propTypes = {
	classes: PropTypes.object.isRequired,
  };


export default withStyles(useStyles)(Progress);