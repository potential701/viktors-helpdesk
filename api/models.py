from sqlmodel import SQLModel, Field, Relationship
import datetime


class User(SQLModel, table=True):
    __name__ = 'user'
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True)
    password: str = Field()
    access_level: str = Field()

    # Relationship
    issues_created: list["Issue"] = Relationship(back_populates='created_by',
                                                 sa_relationship_kwargs=dict(foreign_keys='[Issue.created_by_id]'))
    issues_assigned: list["Issue"] = Relationship(back_populates='assigned_to',
                                                  sa_relationship_kwargs=dict(foreign_keys='[Issue.assigned_to_id]'))
    comments: list["Comment"] = Relationship(back_populates='user')


class Category(SQLModel, table=True):
    __name__ = 'category'
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: str = Field()

    # Relationships
    issues: list["Issue"] = Relationship(back_populates='category')


class Issue(SQLModel, table=True):
    __name__ = 'issue'
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    description: str = Field()
    status: str = Field(default='Open')
    priority: str = Field(default='Medium')
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
    updated_at: datetime.datetime = Field(default_factory=datetime.datetime.now)

    # Foreign Keys
    created_by_id: int | None = Field(default=None, foreign_key='user.id')
    assigned_to_id: int | None = Field(default=None, foreign_key='user.id')
    category_id: int | None = Field(default=None, foreign_key='category.id')

    # Relationships
    created_by: User | None = Relationship(back_populates='issues_created',
                                           sa_relationship_kwargs=dict(foreign_keys='[Issue.created_by_id]'))
    assigned_to: User | None = Relationship(back_populates='issues_assigned',
                                            sa_relationship_kwargs=dict(foreign_keys='[Issue.assigned_to_id]'))
    category: Category | None = Relationship(back_populates='issues')
    comments: list["Comment"] = Relationship(back_populates='issue')


class Comment(SQLModel, table=True):
    __name__ = 'comment'
    id: int | None = Field(default=None, primary_key=True)
    content: str = Field()
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)

    # Foreign Keys
    issue_id: int | None = Field(foreign_key='issue.id')
    user_id: int | None = Field(foreign_key='user.id')

    # Relationships
    issue: Issue = Relationship(back_populates='comments')
    user: User = Relationship(back_populates='comments')
