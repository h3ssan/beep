import { NavLink, useHistory, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Body1, Heading1, Heading3, Heading5 } from '../../../components/Typography';
import {Card} from '../../../components/Card';
import {gql, useMutation, useQuery} from '@apollo/client';
import {DeleteBeepMutation, GetBeepQuery} from '../../../generated/graphql';

dayjs.extend(duration);

const DeleteBeep = gql`
    mutation DeleteBeep($id: String!) {
        deleteBeep(id: $id)
    }
`;

const GetBeep = gql`
    query GetBeep($id: String!) {
        getBeep(id: $id) {
            id
            origin
            destination
            start
            end
            groupSize
            beeper {
                id
                first
                last
                photoUrl
                username
            }
            rider {
                id
                first
                last
                photoUrl
                username
            }
        }
    }
`;

function BeepPage() {
    const { beepId } = useParams<{ beepId: string }>();
    const { data } = useQuery<GetBeepQuery>(GetBeep, { variables: { id: beepId}});
    const [deleteBeep, { loading: deleteLoading }] = useMutation<DeleteBeepMutation>(DeleteBeep);
    const history = useHistory();

    async function doDeleteBeep() {
        await deleteBeep({ variables: { id: beepId }});
        history.goBack();
    }

    return (
        <>
            <div className="flex flex-row justify-between">
            <Heading3>Beep</Heading3>
            <button
                onClick={() => doDeleteBeep()}
                className={"mt-2 mb-2 py-2 px-4 mr-1 text-sm font-medium rounded-md text-white shadow-sm text-white bg-red-500 hover:bg-red-700"}
            >
                {!deleteLoading ? "Delete Beep" : "Loading"}
            </button>
            </div>
            {data?.getBeep ?
                <><div>
                    <iframe
                        className="mb-4"
                        title="Map"
                        width="100%"
                        height="300"
                        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBgabJrpu7-ELWiUIKJlpBz2mL6GYjwCVI&origin=${data.getBeep.origin}&destination=${data.getBeep.destination}`}>
                    </iframe>

                    <div className="flex flex-wrap">
                        <Card className="flex-grow mb-4 sm:mr-2">
                            <div className="m-4">
                                <Heading5>Beeper</Heading5>
                                <div className="flex flex-row items-center">
                                    {data.getBeep.beeper.photoUrl && (
                                        <div className="flex mr-3">
                                            <img className="w-10 h-10 rounded-full shadow-lg" src={data.getBeep.beeper.photoUrl} alt={`${data.getBeep.beeper.first} ${data.getBeep.beeper.last}`}></img>
                                        </div>
                                    )}
                                    <NavLink to={`/admin/users/${data.getBeep.beeper.id}`}>
                                        {data.getBeep.beeper.first} {data.getBeep.beeper.last}
                                    </NavLink>
                                </div>
                            </div>
                        </Card>
                        <Card className="flex-grow mb-4">
                            <div className="m-4">
                                <Heading5>Rider</Heading5>
                                <div className="flex flex-row items-center">
                                    {data.getBeep.rider.photoUrl && (
                                        <div className="flex mr-3">
                                            <img className="w-10 h-10 rounded-full shadow-lg" src={data.getBeep.rider.photoUrl} alt={`${data.getBeep.rider.first} ${data.getBeep.rider.last}`}></img>
                                        </div>
                                    )}
                                    <NavLink to={`/admin/users/${data.getBeep.rider.id}`}>
                                        {data.getBeep.rider.first} {data.getBeep.rider.last}
                                    </NavLink>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="flex flex-wrap">
                        <Card className="flex-grow mb-4 sm:mr-2">
                            <div className="p-4">
                                <Heading5>Origin</Heading5>
                                <Body1>{data.getBeep.origin}</Body1>
                            </div>
                        </Card>
                        <Card className="flex-grow mb-4">
                            <div className="p-4">
                                <Heading5>Destination</Heading5>
                                <Body1>{data.getBeep.destination}</Body1>
                            </div>
                        </Card>
                    </div>
                    <Card className="mb-4">
                        <div className="p-4">
                            <Heading5>Group Size</Heading5>
                            <Body1>{data.getBeep.groupSize}</Body1>
                        </div>
                    </Card>
                    <div className="flex flex-wrap">
                        <Card className="flex-grow mb-4 sm:mr-2">
                            <div className="p-4">
                                <Heading5>Beep Started</Heading5>
                                <Body1>{new Date(data.getBeep.start).toLocaleString()} - {dayjs().to(data.getBeep.start)}</Body1>
                            </div>
                        </Card>
                        <Card className="flex-grow mb-4">
                            <div className="p-4">
                                <Heading5>Beep Ended</Heading5>
                                <Body1>{new Date(data.getBeep.end).toLocaleString()} - {dayjs().to(data.getBeep.end)}</Body1>
                            </div>
                        </Card>
                    </div>
                </div>
                </>
            :
            <Heading1>Loading</Heading1>
            }
        </>
    )
}

export default BeepPage;
