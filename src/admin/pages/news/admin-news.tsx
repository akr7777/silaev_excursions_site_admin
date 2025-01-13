import { v4 } from "uuid"
import { Preloader } from "../../../shared/preloader/preloader"
import { OneNewType } from "../../../store/features/newSlice/types/news-types"
import { useAppSelector } from "../../../store/store"
import { OneAdminNewList } from "./one-new-card/one-admin-new-card"
import { useNavigate } from "react-router"
import { PATHS } from "../../../router/router"

import "./admin-news.scss"
import { CustomButton } from "../../../components/my-button/my-button"
import { CREATE_NEW_ENTETY } from "../../../shared/consts"

export const AdminNews = () => {
    const navigate = useNavigate()

    const news: Array<OneNewType> = useAppSelector(state => state.newsSlice.news)
    const isNewsLoading: boolean = useAppSelector(state => state.newsSlice.isNewsLoading)

    const onNewClick = (id: string) => navigate(PATHS.admin.news + id)
    const onCreateNewClick = () => navigate(PATHS.admin.news + CREATE_NEW_ENTETY)

    return (
        <div className="admin-news-wrapper">
            <h3>Новости</h3>

            <CustomButton title={"Создать новость"} onPress={onCreateNewClick} class="admin-create-btn" />

            {isNewsLoading ? <Preloader /> : (
                <>
                    {news.length > 0 && news
                        // .sort((a:OneNewType, b:OneNewType) => a.date < b.date ? -1 : 1)
                        .map(n => {
                            return <div key={v4()} onClick={() => onNewClick(n.id)}>
                                <OneAdminNewList oneNew={n} />
                            </div>
                             
                        })}
                </>
            )}

        </div>
    )
}