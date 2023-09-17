import React, { useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import { loadGallery } from "../../redux/features/gallery/gallery";


export const GallerySorter = ({ onSortByName, onSortByDate, onSortByDescription }) => {
    const dispatch = useDispatch();
    const [sortByName, setSortByName] = useState("asc");
    const [sortByDate, setSortByDate] = useState("asc");
    const [sortByDescription, setSortByDescription] = useState("asc");

    useEffect(() => {
        dispatch(loadGallery());
    }, [dispatch]);

    const handleSortByName = () => {
        setSortByName(sortByName === "asc" ? "desc" : "asc");
        if (typeof onSortByName === "function") {
            onSortByName(sortByName);
        }
    };

    const handleSortByDate = () => {
        setSortByDate(sortByDate === "asc" ? "desc" : "asc");
        if (typeof onSortByDate === "function") {
            onSortByDate(sortByDate);
        }
    };

    const handleSortByDescription = () => {
        setSortByDescription(sortByDescription === "asc" ? "desc" : "asc");
        if (typeof onSortByDescription === "function") {
            onSortByDescription(sortByDescription);
        }
    };

      export const sortGallery = (items) => {
        const sortedItems = [...items];

        sortedItems.sort((a, b) => {
            if (sortByName !== "none") {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return sortByName === "asc" ? -1 : 1;
                }
                if (nameA > nameB) {
                    return sortByName === "asc" ? 1 : -1;
                }
            }

            if (sortByDate !== "none") {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return sortByDate === "asc" ? dateA - dateB : dateB - dateA;
            }

            if (sortByDescription !== "none") {
                const descriptionA = a.description.toLowerCase();
                const descriptionB = b.description.toLowerCase();
                if (descriptionA < descriptionB) {
                    return sortByDescription === "asc" ? -1 : 1;
                }
                if (descriptionA > descriptionB) {
                    return sortByDescription === "asc" ? 1 : -1;
                }
            }

            return 0;
        });

        return sortedItems;
    };


    return (
        <div>
            <Select
                value={sortByName}
                onChange={handleSortByName}
                variant="outlined"
            >
                <MenuItem value="asc">Сортировка по имени (по возрастанию)</MenuItem>
                <MenuItem value="desc">Сортировка по имени (по убыванию)</MenuItem>
            </Select>
            <Select
                value={sortByDate}
                onChange={handleSortByDate}
                variant="outlined"
            >
                <MenuItem value="asc">Сортировка по дате создания (по возрастанию)</MenuItem>
                <MenuItem value="desc">Сортировка по дате создания (по убыванию)</MenuItem>
            </Select>
            <Select
                value={sortByDescription}
                onChange={handleSortByDescription}
                variant="outlined"
            >
                <MenuItem value="asc">Сортировка по описанию (по возрастанию)</MenuItem>
                <MenuItem value="desc">Сортировка по описанию (по убыванию)</MenuItem>
            </Select>
        </div>
    );
}


