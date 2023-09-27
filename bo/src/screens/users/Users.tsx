import { useMemo } from "react"
import Actions from "../../components/actions/Actions"
import View from "../../components/view/View"
import Table from "../../components/table/Table"
import { THEME } from "../../theme"
import { MdDescription } from "react-icons/md"
import { useFetcher } from "../../hooks/useFetcher"
import { ENDPOINT } from "../../config"
import type { User } from "../../types"
import Loader from "../../components/Loader/Loader"

type Response = {
    users?: User[]
}

function Users() {

    const { 
        data,
        loading
    } = useFetcher<Response>({method: "GET", url: ENDPOINT.auth.users})
    
    const userPreview = useMemo(() => {
        return data?.users?.map(user => {
            return {
                documento: user.numIdent,
                tipo: user.Identification.name,
                nombre : `${user.firstName} ${user.lastName}`,
                email: user.email,
                phone: user.phone,
                rol: user.Role.role
            }
        })

    }, [data])

    const headers = ["documento", "tipo", "nombre", "email", "teléfono", "rol"]

  return (
    <div>
        <Actions>
            <button
                style={{
                    width: 120,
                    height: 30,
                    backgroundColor: THEME.black,
                    color: THEME.white,
                    border: "none",
                    borderRadius: 5,
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly"
                }}
            >
                export csv <MdDescription />
            </button>
        </Actions>
        <View>
            {
                loading 
                ? <Loader />
                : <Table 
                    headers={headers}
                    items={
                        userPreview === undefined ? [] : userPreview
                    }
                />
            }
        </View>
    </div>
  )
}


export default Users