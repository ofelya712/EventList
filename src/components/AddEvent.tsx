import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material"
import { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EventContext } from "../lib/Context";
import { ActionTypes, IEvent, events } from "../lib/types";
import { addEvent } from "../lib/api";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
interface Inputs {
    title: string
    date: string
    time: string
    cover: string
    type: string
    composer: string
}
export const AddEvent = () => {
    const [open, setOpen] = useState<boolean>(false)
    const context = useContext(EventContext)
    if (!context) {
        throw new Error("ERROR")
    }
    const { dispatch } = context

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>()
    const handleAdd: SubmitHandler<Inputs> = (data) => {
        const event: Omit<IEvent, "id"> = {
            title: data.title,
            date: data.date,
            time: data.time,
            cover: data.cover,
            type: data.type as unknown as events,
            composer: data.composer
        }
        addEvent(event as IEvent)
            .then(res => {
                dispatch({ type: ActionTypes.addEvent, payload: res })
                setOpen(false)
                reset()
            })

    }
    return <Box my={2}>
        <Button onClick={() => setOpen(true)} variant="contained">add</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
                <form onSubmit={handleSubmit(handleAdd)}>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="Title"
                            {...register("title", { required: "please fill all fields" })}
                            error={!!errors.title}
                            helperText={errors.title?.message}


                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="date"
                            {...register("date", { required: "please fill all fields" })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="time"
                            {...register("time", {
                                required: "please fill all fields",
                                pattern: {
                                    value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                                    
                                }
                            })}
                            error={!!errors.date}
                            helperText={errors.title?.message}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="composer"
                            {...register("composer", { required: "please fill all fields" })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    </Box>
                    <Box my={2}>
                        <Select sx={{ width: 200 }} {...register("type")}>
                            <MenuItem value="opera">opera</MenuItem>
                            <MenuItem value="ballet">ballet</MenuItem>
                        </Select>
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="cover"
                            {...register("cover", { required: "please fill all fields" })}
                            error={!!errors.title}
                            helperText={errors.title?.message}

                        />
                    </Box>
                    <Button type="submit" variant="outlined"> submit</Button>
                </form>
            </Box>
        </Modal>
    </Box>
}