from pydantic import BaseModel

class PaginationMeta(BaseModel):
    page: int
    size: int
    total: int
    total_pages: int