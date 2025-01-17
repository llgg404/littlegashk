import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
	card: {
		// maxWidth: 345,
		borderRadius: 0,
		marginBottom: '20px',
		backgroundColor: '#f9f9f9',
		'& a': {
			color: '#3d8af7',
		},
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function ReferencesCard(props){
	const {data} = props;
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	function handleExpandClick() {
		setExpanded(!expanded);
	}

	return(
	<Card className={classes.card}>
		{/* <CardActions disableSpacing>
			<IconButton
				className={clsx(classes.expand, {
					[classes.expandOpen]: expanded,
				})}
				onClick={handleExpandClick}
				aria-expanded={expanded}
				aria-label="show more"
			>
				<ExpandMoreIcon />
			</IconButton>
		</CardActions> */}
		{/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
			<CardContent>
				<Typography variant="body2" color="textSecondary" paragraph>
					{data.date}
				</Typography>
				<Typography paragraph>
					{data.comment}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					Source : <br/>
					<a href={data.link} title={data.title}>{data.name} - {data.title}</a>
				</Typography>
			</CardContent>
		{/* </Collapse> */}
	</Card>
	)
};

// export default References;